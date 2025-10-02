import { Metadata } from "next";
import ChangePassword from "./update-password";
import ProfileUpdate from "./profile-update";

export const metadata: Metadata = {
  title: "Profil – UI Components Library",
  description:
    "Foydalanuvchi profilingizni boshqaring va sozlang. shadcn/ui asosida yaratilgan, qulay va moslashuvchan interfeys.",
  icons: {
    icon: "/logo.png",
  },
};

export default function ProfilePage() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Profil
        </h1>
        <div className="w-full md:w-auto">
          <ChangePassword />
        </div>
      </div>
      <div className="py-4">
        <ProfileUpdate />
      </div>
    </div>
  );
}
