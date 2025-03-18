import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';


const itens = [
  { nome: "Home", id: 1 },
  { nome: "Vitrine", id: 2 },
  { nome: "Carrinho", id: 3 },
]

const socials = [
  { nome: "Facebook", id: 1, link: "https://www.facebook.com/avantiatlantico", icon: "facebook-f" },
  { nome: "Twitter", id: 2, link: "https://x.com/ifceoficial", icon: "twitter" },
  { nome: "Instagram", id: 3, link: "https://www.instagram.com/avanti.ia", icon: "instagram" },
]

const Footer = () => {
  return (
    <footer
      className="text-center text-white"
      style={{ background: "linear-gradient(10deg, rgb(178, 0, 255) 0%, rgba(21, 0, 255, 1) 100%)" }}
    >
      <div className="container">
        <section className="mt-5">
          <div className="row text-center d-flex justify-content-center pt-5">
            {itens.map((item) => (
              <div className="col-md-2" key={item.id}>
                <h6 className="text-uppercase font-weight-bold">
                  <Nav.Link
                    as={Link}
                    to={item.nome === "Home" ? "/" : `/${item.nome.toLowerCase()}`}
                    className="text-white"
                  >
                    {item.nome}
                  </Nav.Link>
                </h6>
              </div>
            ))}
          </div>

        </section>

        <hr className="my-5" />

        <section className="mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
                A OrionByte é a loja perfeita para quem busca o melhor em equipamentos gamer e soluções tecnológicas para o dia a dia. Com uma seleção de produtos de alta qualidade e desempenho, oferecemos tudo o que você precisa para aprimorar sua jogabilidade ou potencializar suas tarefas no universo da TI. Com preços acessíveis e novidades constantes, a OrionByte é a sua parada obrigatória para o que há de melhor em tecnologia! Venha explorar e encontrar o que você precisa para conquistar novos desafios! 🚀💻🎮
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-5">
          {socials.map((socials) => (
            <a
              href={socials.link}
              className="text-white me-4"
              aria-label={socials.nome}
              key={socials.id}
            >
              <i className={`fab fa-${socials.icon}`}></i>
            </a>
          ))}
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © Desenvolvido por: <a className="text-white" href="https://github.com/leviruz/avanti">Equipe 03 - FSN5.</a>
      </div>
    </footer>
  );
};

export default Footer;