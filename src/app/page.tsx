import { AppProvider } from "@/lib/context";
import { Landing } from "@/components/landing";

export default function Page() {
  return (
    <AppProvider>
      <Landing />
    </AppProvider>
  );
}
