import { useTranslation } from "react-i18next"
import { DateTime } from 'luxon';

export const Footer = () => {
    const { t } = useTranslation();

    const getGreetingTime = (d = DateTime.now()) => {
        const splitAfternoon = 12;
        const splitEvening = 17;
        const currentHour = parseFloat(d.toFormat('hh'));

        if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
            return 'afternoon';
        } else if (currentHour >= splitEvening) {
            return 'evening';
      }
        return 'morning';
    }

    return <div>
        <div>{t('footer.date', { date: new Date(), context: getGreetingTime() })}</div>
    </div>
}