import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { meetingsData } from '../i18n/meetingsData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('today');
  const [currentLang, setCurrentLang] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(34);
  const [isPresented, setIsPresented] = useState(false);
  const [scenario, setScenarioState] = useState('normal');
  const [activeMeetingId, setActiveMeetingId] = useState('ops');
  const [outputStatus, setOutputStatus] = useState('draft');
  const [activeSheet, setActiveSheet] = useState(null); // 'notif' | 'why' | 'approval' | null
  const [toastMessage, setToastMessage] = useState(null);
  const [askQuery, setAskQuery] = useState('');

  const [remindersList, setRemindersList] = useState([
    { id: 1, title: 'Follow up on Pier B luxury tenant SLA draft', titleAr: 'متابعة مسودة اتفاقية مستوى الخدمة لمستأجري الرصيف B', time: 'Due today · 15:30', timeAr: 'الموعد: اليوم · 15:30', done: false },
    { id: 2, title: 'Review summer heat contingency buffer report', titleAr: 'مراجعة تقرير طوارئ حرارة الصيف ومرونة المواقف', time: 'Due tomorrow · 09:00', timeAr: 'الموعد: غداً · 09:00', done: false },
    { id: 3, title: 'Ratify GCAA Runway Noise Abatement declaration', titleAr: 'اعتماد إقرار الامتثال لخفض الضوضاء لهيئة الطيران', time: 'Due today · 14:00', timeAr: 'الموعد: اليوم · 14:00', done: false }
  ]);

  // Handle Recording Timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle Presentation Mode Body Class & Escape Key
  useEffect(() => {
    if (isPresented) {
      document.body.classList.add('is-presenting');
    } else {
      document.body.classList.remove('is-presenting');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPresented) {
        setIsPresented(false);
        showToast(currentLang === 'ar' ? 'تم الخروج من وضع العرض' : 'Exited Present Mode');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresented, currentLang]);

  // Handle Direction Attributes
  useEffect(() => {
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang]);

  const t = (key) => {
    return translations[currentLang]?.[key] || translations.en[key] || key;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const toggleLanguage = () => {
    const next = currentLang === 'en' ? 'ar' : 'en';
    setCurrentLang(next);
    showToast(next === 'ar' ? 'تم التبديل إلى اللغة العربية (RTL)' : 'Switched to English (LTR)');
  };

  const switchTab = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePresentMode = () => {
    const next = !isPresented;
    setIsPresented(next);
    showToast(
      next
        ? (currentLang === 'ar' ? 'وضع العرض التنفيذي: شاشة الهاتف كاملة' : 'Present Mode: Full phone screen fitted')
        : (currentLang === 'ar' ? 'تم الخروج من وضع العرض' : 'Exited Present Mode')
    );
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecSeconds(0);
    showToast(currentLang === 'ar' ? 'تم تفعيل إلهي: جاري تسجيل وتحليل مجريات الاجتماع' : 'Elahi Active: Live meeting transcription & synthesis started');
  };

  const stopRecording = () => {
    setIsRecording(false);
    showToast(currentLang === 'ar' ? 'تم استخراج القرارات والإجراءات المعلقة بنجاح' : 'Meeting Minutes & AI Agent Decisions Generated');
    openMeetingOutput('ops', 'draft');
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const openMeetingOutput = (meetingId = 'ops', state = 'draft') => {
    setActiveMeetingId(meetingId);
    setOutputStatus(state);
    switchTab('meetingoutput');
  };

  const approveCurrentMeeting = () => {
    setOutputStatus('approved');
    showToast(currentLang === 'ar' ? 'تم اعتماد وتوثيق السجل الرسمي' : 'Official Record Approved & Sealed');
  };

  const setScenario = (scenarioKey) => {
    setScenarioState(scenarioKey);
    if (scenarioKey === 'normal') {
      showToast(currentLang === 'ar' ? 'الحالة العادية: جميع المصادر موثقة' : 'Normal State: All sources verified');
    } else if (scenarioKey === 'conflict') {
      setActiveSheet('why');
      showToast(currentLang === 'ar' ? 'تم استبعاد الرقم المتعارض تلقائياً' : 'Conflicting value excluded per Trust Guardrails');
    } else if (scenarioKey === 'denied') {
      showToast(currentLang === 'ar' ? 'تم قفل الوصول: يتطلب تصريح مستوى 1' : 'Access Restricted: Requires Board Clearance');
    }
  };

  const toggleReminder = (id) => {
    setRemindersList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const addReminder = (text) => {
    if (!text.trim()) return;
    const newRem = {
      id: Date.now(),
      title: text,
      titleAr: text,
      time: currentLang === 'ar' ? 'مضاف حديثاً' : 'Added just now',
      timeAr: 'مضاف حديثاً',
      done: false
    };
    setRemindersList([newRem, ...remindersList]);
    showToast(currentLang === 'ar' ? 'تمت إضافة التذكير بنجاح' : 'Executive Reminder Added');
  };

  const executeAskQuery = (queryText) => {
    setAskQuery(queryText);
    switchTab('answer');
  };

  const currentMeetingData = meetingsData[activeMeetingId] || meetingsData.ops;

  return (
    <AppContext.Provider
      value={{
        currentTab,
        switchTab,
        currentLang,
        toggleLanguage,
        t,
        isRecording,
        recSeconds,
        startRecording,
        stopRecording,
        toggleRecording,
        isPresented,
        togglePresentMode,
        scenario,
        setScenario,
        activeMeetingId,
        outputStatus,
        openMeetingOutput,
        approveCurrentMeeting,
        currentMeetingData,
        remindersList,
        toggleReminder,
        addReminder,
        activeSheet,
        setActiveSheet,
        toastMessage,
        showToast,
        askQuery,
        setAskQuery,
        executeAskQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
