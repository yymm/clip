import type { MetaFunction } from "@remix-run/cloudflare";
import { Calendar } from "../_app/components/calendar";
import { WeeklyCalendar } from "../_app/components/weekly_calendar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div className="font-sans">
      <Calendar />
    </div>
  );
}
