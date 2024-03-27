import NavBar from "./NavBarSideBar/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="m-auto max-w-7xl p-4">{children}</main>
    </>
  );
}
