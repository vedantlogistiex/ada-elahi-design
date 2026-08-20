import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { meetingsData } from '../i18n/meetingsData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('today');
  const [currentLang, setCurrentLang] = useState('en');
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
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
    { id: 1, titleKey: 'rem1Title', timeKey: 'rem1Time', customTitle: '', customTime: '', done: false },
    { id: 2, titleKey: 'rem2Title', timeKey: 'rem2Time', customTitle: '', customTime: '', done: false }
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

  // Handle Theme Attribute on Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

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

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(next === 'dark' ? 'تم تفعيل الوضع الليلي الفاخر' : 'Switched to Light Theme');
  };

  const switchTab = (tab) => {
    setCurrentTab(tab);
    setActiveSheet(null);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecSeconds(0);
    showToast(currentLang === 'ar' ? 'بدأ تسجيل وتفريغ الاجتماع المباشر' : 'Live Meeting Recording & Diarization Started');
  };

  const stopRecording = () => {
    setIsRecording(false);
    showToast(currentLang === 'ar' ? 'تم حفظ المحضر وتوليد القرارات' : 'Meeting Synthesized · Minutes Generated');
    setOutputStatus('draft');
    switchTab('meetingoutput');
  };

  const openMeetingOutput = (meetingId = 'ops', status = 'draft') => {
    setActiveMeetingId(meetingId);
    setOutputStatus(status);
    switchTab('meetingoutput');
  };

  const setScenario = (scene) => {
    setScenarioState(scene);
    if (scene === 'normal') showToast(currentLang === 'ar' ? 'الحالة: تشغيل قياسي' : 'Scenario: Normal Operations');
    if (scene === 'conflict') showToast(currentLang === 'ar' ? 'الحالة: تعارض في الجداول' : 'Scenario: Schedule Conflict Detected');
    if (scene === 'denied') showToast(currentLang === 'ar' ? 'الحالة: صلاحيات مرفوضة' : 'Scenario: Access Clearance Denied');
    if (scene === 'loading') showToast(currentLang === 'ar' ? 'الحالة: جاري المعالجة الذكية' : 'Scenario: AI Synthesizing');
  };

  const approveCurrentMeeting = () => {
    setOutputStatus('approved');
    showToast(currentLang === 'ar' ? 'تم اعتماد المحضر وختمه رسمياً' : 'Record Formally Approved & Sealed');
  };

  const togglePresentMode = () => {
    setIsPresented(!isPresented);
  };

  const executeAskQuery = (queryText) => {
    setAskQuery(queryText);
    switchTab('answer');
  };

  const addReminder = (title) => {
    const newId = Date.now();
    setRemindersList((prev) => [
      ...prev,
      { id: newId, titleKey: '', timeKey: '', customTitle: title, customTime: 'Due today · 17:00', done: false }
    ]);
    showToast(currentLang === 'ar' ? 'تمت إضافة التذكير' : 'Reminder Created');
  };

  const toggleReminder = (id) => {
    setRemindersList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const currentMeetingData = meetingsData[activeMeetingId] || meetingsData.ops;

  return (
    <AppContext.Provider
      value={{
        currentTab,
        switchTab,
        currentLang,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        isRecording,
        startRecording,
        stopRecording,
        recSeconds,
        isPresented,
        togglePresentMode,
        scenario,
        setScenario,
        activeMeetingId,
        outputStatus,
        openMeetingOutput,
        approveCurrentMeeting,
        activeSheet,
        setActiveSheet,
        closeSheet: () => setActiveSheet(null),
        toastMessage,
        showToast,
        askQuery,
        setAskQuery,
        executeAskQuery,
        remindersList,
        addReminder,
        toggleReminder,
        currentMeetingData,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
