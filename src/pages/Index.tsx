import { useEffect } from "react";

/** Opens the self-contained Portuguese booking site, also deployable without React. */
const Index = () => {
  const destination = `${import.meta.env.BASE_URL}sabrine/index.html`;
  useEffect(() => { window.location.replace(destination); }, [destination]);
  return <main style={{ padding: "3rem", fontFamily: "Georgia, serif" }}>
    <h1>Sabrine Reis</h1>
    <p>Manicure e pedicure em Castilho–SP.</p>
    <a href={destination}>Abrir site e solicitar atendimento</a>
  </main>;
};
export default Index;
