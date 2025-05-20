import { createContext, useContext, useState } from 'react';

const TabBarTypeContext = createContext<{
  tabBarType: 'tabBarType1' | 'tabBarType2';
  setTabBarType: (v: 'tabBarType1' | 'tabBarType2') => void;
}>({
  tabBarType: 'tabBarType1',
  setTabBarType: () => {},
});

export const TabBarSampleProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabBarType, setTabBarType] = useState<'tabBarType1' | 'tabBarType2'>('tabBarType1');
  return <TabBarTypeContext.Provider value={{ tabBarType, setTabBarType }}>{children}</TabBarTypeContext.Provider>;
};

export const useTabBarType = () => {
  return useContext(TabBarTypeContext);
};
