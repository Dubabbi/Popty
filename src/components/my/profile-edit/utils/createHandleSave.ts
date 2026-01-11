import type { ToastType } from "@/components/Toast";

export type SaveProfileArgs = {
  nickname: string | null;
  location: string | null;
  bio: string | null;
};

export type SaveProfileFn = (args: SaveProfileArgs) => Promise<unknown>;

type ShowToast = (opts: { message: string; type: ToastType }) => void;

function toNullable(v: string) {
  const t = v.trim();
  return t.length ? t : null;
}

export function createHandleSave(params: {
  isSaving: boolean;
  saveProfile: SaveProfileFn;
  name: string;
  location: string;
  bio: string;
  setShowSuccess: (v: boolean) => void;
  showToast: ShowToast;
}) {
  const { isSaving, saveProfile, name, location, bio, setShowSuccess, showToast } = params;

  return async function handleSave() {
    if (isSaving) return;

    try {
      await saveProfile({
        nickname: toNullable(name),
        location: toNullable(location),
        bio: toNullable(bio),
      });

      setShowSuccess(true);
      showToast({
        message: "저장되었습니다.",
        type: "success",
      });
      window.setTimeout(() => setShowSuccess(false), 2000);
    } catch (e) {
      console.error(e);

      showToast({
        message: "저장에 실패했어요. 잠시 후 다시 시도해 주세요.",
        type: "error",
      });
    }
  };
}
