'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define translations structure
interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

// NOTE: This is a partial translation for demonstration purposes.
const translations: Translations = {
  // Dashboard Layout
  dashboard: { en: 'Dashboard', dz: 'འཛིན་སྐྱོང་ལྟེ་བ།' },
  myApplication: { en: 'My Application', dz: 'ངའི་ཞུ་ཡིག' },
  aiCompliance: { en: 'AI Compliance', dz: 'AI མཐུན་རྐྱེན།' },
  incorporate: { en: 'Incorporate', dz: 'ལས་འཛུགས་བསྐྲུན་པ།' },
  welcomeMessage: { en: 'Joen pa Leg So, {userName}', dz: 'བཀྲ་ཤིས་བདེ་ལེགས་, {userName}' },
  editProfile: { en: 'Edit Profile', dz: 'རང་གི་ལོ་རྒྱུས་ཞུན་དག' },
  settings: { en: 'Settings', dz: 'སྒྲིག་སྟངས།' },
  logOut: { en: 'Log Out', dz: 'ཕྱིར་ཐོན།' },
  
  // Settings Page
  appearance: { en: 'Appearance', dz: 'བཟོ་རྣམ།' },
  appearanceDesc: { en: 'Customize the look and feel of your dashboard.', dz: 'ཁྱེད་རང་གི་འཛིན་སྐྱོང་ལྟེ་བའི་བཟོ་རྣམ་དང་ཚོར་སྣང་ཚུ་སྒྲིག་སྟངས་བཟོ།' },
  darkMode: { en: 'Dark Mode', dz: 'ནག་པོའི་བཟོ་རྣམ།' },
  darkModeDesc: { en: 'Toggles between a light and dark theme.', dz: 'དཀར་པོའི་བཟོ་རྣམ་དང་ནག་པོའི་བཟོ་རྣམ་གྱི་བར་ན་སོར་བརྗེ་འབད།' },
  notificationPrefs: { en: 'Notification Preferences', dz: 'བརྡ་བསྐུལ་གྱི་དགའ་གདམ།' },
  notificationPrefsDesc: { en: 'Manage how we contact you.', dz: 'ང་བཅས་ཀྱིས་ཁྱེད་ལུ་འབྲེལ་བ་འབད་ཐངས་ཚུ་འཛིན་སྐྱོང་འཐབ།' },
  appUpdates: { en: 'Application Updates', dz: 'ཞུ་ཡིག་གི་གསར་བསྒྱུར།' },
  appUpdatesDesc: { en: 'Receive email notifications about the status of your applications.', dz: 'ཁྱེད་རང་གི་ཞུ་ཡིག་གི་གནས་སྟངས་སྐོར་ལས་གློག་འཕྲིན་གྱི་བརྡ་བསྐུལ་ཚུ་ལེན།' },
  promoEmails: { en: 'Promotional Emails', dz: 'ཁྱབ་བསྒྲགས་ཀྱི་གློག་འཕྲིན།' },
  promoEmailsDesc: { en: 'Get emails about new features, services, and special offers.', dz: 'ཁྱད་ཆོས་གསརཔ་དང་། ཞབས་ཏོག། དམིགས་བསལ་གྱི་གོ་སྐབས་ཚུ་གི་སྐོར་ལས་གློག་འཕྲིན་ཚུ་ལེན།' },
  security: { en: 'Security', dz: 'སྲུང་སྐྱོབ།' },
  securityDesc: { en: 'Manage your account security settings.', dz: 'ཁྱེད་རང་གི་རྩིས་ཐོའི་སྲུང་སྐྱོབ་སྒྲིག་སྟངས་ཚུ་འཛིན་སྐྱོང་འཐབ།' },
  twoFactorAuth: { en: 'Two-Factor Authentication (2FA)', dz: 'རིམ་པ་གཉིས་ཀྱི་ངོས་འཛིན་ར་སྤྲོད། (2FA)' },
  twoFactorAuthDesc: { en: 'Add an extra layer of security to your account.', dz: 'ཁྱེད་རང་གི་རྩིས་ཐོ་ནང་སྲུང་སྐྱོབ་ཀྱི་རིམ་པ་ተጨማሪ ավելացնել' },
  setup2FA: { en: 'Set Up 2FA', dz: '2FA སྒྲིག་སྟངས་བཟོ།' },
  changePassword: { en: 'Change Password', dz: 'གསང་ཚིག་སོར་བརྗེ་འབད།' },
  currentPassword: { en: 'Current Password', dz: 'ད་ལྟོའི་གསང་ཚིག' },
  newPassword: { en: 'New Password', dz: 'གསང་ཚིག་གསརཔ།' },
  confirmNewPassword: { en: 'Confirm New Password', dz: 'གསང་ཚིག་གསརཔ་ངེས་བརྟན་བཟོ།' },
  updatePassword: { en: 'Update Password', dz: 'གསང་ཚིག་གསར་བསྒྱུར་འབད།' },
  dataPrivacy: { en: 'Data & Privacy', dz: 'གནད་ས้อมูลདང་སྒེར་དབང།' },
  dataPrivacyDesc: { en: 'Manage your personal data and account.', dz: 'ཁྱེད་རང་གི་སྒེར་གྱི་གནད་ས้อมูลདང་རྩིས་ཐོ་འཛིན་སྐྱོང་འཐབ།' },
  downloadData: { en: 'Download Your Data', dz: 'ཁྱེད་རང་གི་གནད་ས้อมูลཕབ་ལེན།' },
  downloadDataDesc: { en: 'Get a copy of all your data stored with eBhutanza.', dz: 'eBhutanza ནང་བསགས་ཡོད་པའི་ཁྱེད་རང་གི་གནད་ས้อมูลཆ་མཉམ་གྱི་འདྲ་ཅིག་ལེན།' },
  download: { en: 'Download', dz: 'ཕབ་ལེན།' },
  deleteAccount: { en: 'Delete Account', dz: 'རྩིས་ཐོ་བཏོན་གཏང།' },
  deleteAccountDesc: { en: 'This will permanently delete your account and all associated data. This action cannot be undone.', dz: 'འདི་གིས་ཁྱེད་རང་གི་རྩིས་ཐོ་དང་འབྲེལ་ཡོད་གནད་ས้อมูลཆ་མཉམ་རྦད་དེ་བཏོན་གཏང་འོང་། ལཱ་འདི་སླར་ལོག་འབད་མི་ཚུགས།' },
  delete: { en: 'Delete', dz: 'བཏོན་གཏང།' },
  areYouSure: { en: 'Are you absolutely sure?', dz: 'ཁྱེད་རང་གཏན་གཏན་སྨོནནམ?' },
  areYouSureDesc: { en: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.', dz: 'ལཱ་འདི་སླར་ལོག་འབད་མི་ཚུགས། འདི་གིས་ཁྱེད་རང་གི་རྩིས་ཐོ་རྦད་དེ་བཏོན་གཏང་ཞིནམ་ལས་ང་བཅས་ཀྱི་སར་བར་ལས་ཁྱེད་རང་གི་གནད་ས้อมูลཚུ་ཡང་བཏོན་གཏང་འོང་།' },
  cancel: { en: 'Cancel', dz: 'རద్దుའབད།' },
  continue: { en: 'Continue', dz: 'མུ་མཐུད།' },
  passwordUpdated: { en: 'Password Updated', dz: 'གསང་ཚིག་གསར་བསྒྱུར་འབད་ཚར་ཡི།' },
  passwordUpdatedDesc: { en: 'Your password has been changed successfully.', dz: 'ཁྱེད་རང་གི་གསང་ཚིག་ལེགས་ཤོམ་སྦེ་སོར་བརྗེ་འབད་ཚར་ཡི།' },
  themeChanged: { en: 'Theme changed to {theme}', dz: '{theme} ལུ་བཟོ་རྣམ་སོར་བརྗེ་འབད་ཡི།' },

  // For the new language selector
  english: { en: 'English', dz: 'English' },
  dzongkha: { en: 'Dzongkha', dz: 'རྫོང་ཁ' },
};

const getTranslator = (lang: string) => (key: string, params?: { [key: string]: string | number }) => {
    let text = translations[key]?.[lang] || key;
    if (params) {
        Object.keys(params).forEach(pKey => {
            text = text.replace(`{${pKey}}`, String(params[pKey]));
        });
    }
    return text;
};


type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = getTranslator(language);
  
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
