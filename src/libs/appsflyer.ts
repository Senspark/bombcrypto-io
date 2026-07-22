export const logEvenAppsflyer = (category: string, eventName: string) => {
  if (window.AF)
    window.AF('pba', 'event', {
      eventType: 'EVENT',
      eventValue: { category },
      eventName,
    });
};
