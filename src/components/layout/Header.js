import { UnlockIcon } from "../interface/icons/unlockIcon";
export default function Header() {
  return (
    <header className="p-6">
      <a href="/">
        <UnlockIcon className="w-10" />
      </a>
    </header>
  );
}
