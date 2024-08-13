import { Navbar } from "reactstrap";

const Footer = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar container="md" dark>
        <p style={{ color: "white" }}>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://www.linkedin.com/in/kaioviniciussilva/"
            target="_blank"
            rel="noreferrer"
            className="navbar-brand"
          >
            <span style={{ fontWeight: "bold" }}>KAIO VINICIUS</span>
          </a>
          - TODOS OS DIREITOS RESERVADOS.
        </p>
      </Navbar>
    </footer>
  );
};

export default Footer;
