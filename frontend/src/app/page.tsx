import Form from "./components/Form/Form";



export default function Home() {
  return (
    <main className="bg-red-300 h-screen overflow-y-hidden">
      <header className="bg-[#E65A41]  h-[38px]"></header>
      <section className="h-full flex items-center justify-center flex-col bg-[#F7E652]">
        <Form/>
      </section>
    </main>
  )
}
