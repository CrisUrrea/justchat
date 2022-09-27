import React from "react";
import { Spin, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import Contact from "../components/Contact";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Sidepanel extends React.Component {
  state = {
    loginForm: true
  };

  waitForAuthDetails() {
    const component = this;
    setTimeout(function () {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getUserChats(
          component.props.username,
          component.props.token
        );
        return;
      } else {
        console.log("waiting for authentication details...");
        component.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = e => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(e.target.username.value, e.target.password.value);
    } else {
      this.props.signup(
        e.target.username.value,
        e.target.email.value,
        e.target.password.value,
        e.target.password2.value
      );
    }
  };

  render() {
    let activeChats = this.props.chats.map(c => {
      return (
        <Contact
          key={c.id}
          name="Usuario"
          picURL="https://www.flaticon.es/icono-gratis/imagen-de-usuario-con-fondo-negro_17004"
          status="online"
          chatURL={`/${c.id}`}
        />
      );
    });
    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
            <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
            <img id="profile-img" src="../219983.png" className="online" alt="" />
            <p>Ingresar</p>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle" /> <p>En linea</p>
                </li>
                <li id="status-away">
                  <span className="status-circle" /> <p>Lejos</p>
                </li>
                <li id="status-busy">
                  <span className="status-circle" /> <p>Ocupado</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle" /> <p>Fuera de linea</p>
                </li>
              </ul>
            </div>
            <div id="expanded">
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : this.props.isAuthenticated ? (
                <button onClick={() => this.props.logout()} className="authBtn">
                  <span>Salir</span>
                </button>
              ) : (
                <div>
                  <form method="POST" onSubmit={this.authenticate}>
                    <button type="button" id="btn-abrir-popup1" class="btn-abrir-popup" onClick={() => abrir1()}>Log In</button>
                    <div class="overlay" id="overlay1">
                      <div class="popup" id="popup1">
                        <a href="#" id="btn-cerrar-popup1" class="btn-cerrar-popup">X<i></i></a>
                        <form method="POST" onSubmit={this.authenticate}>
                          <div>
                            <input name="username" type="text" placeholder="Usuario" />
                            <input name="password" type="password" placeholder="Contraseña" />
                          </div>
                          <button type="submit">Verificar</button>
                        </form>
                      </div>
                    </div>
                    <button type="button" id="btn-abrir-popup2" class="btn-abrir-popup" onClick={() => abrir2()}>RfID</button>
                    <element onload={() => myfunction_onload()}></element>
                    <div class="overlay" id="overlay2">
                      <div class="popup" id="popup2">
                        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
                        <a href="#" id="btn-cerrar-popup2" class="btn-cerrar-popup">X<i></i></a>
                        <form >

                        </form>
                        <input type="password" placeholder="Acerque la tarjeta" id="tarjeta" />
                        <button type="submit" onClick={() => myfunction_clickevent()}>Verificar Carnet</button>
                        <p class="mensaje">Tu usuario es:</p>
                        <input type="text" placeholder="#######" />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true" />
          </label>
          <input type="text" placeholder="Buscar Chat..." />
        </div>
        <div id="contacts">
          <ul>{activeChats}</ul>
        </div>
        <div id="bottom-bar">
          <button id="addChat" onClick={() => this.openAddChatPopup()}>
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span>Crear chat</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true" />
            <span>Configuración</span>
          </button>
        </div>
      </div>
    );
  }
}

function rfid() {
  var a = "{{tagId}}";
}

function myfunction_onload() {
  var $
  $.ajax({
    url: "app.py",
    context: document.body
  })
}

function myfunction_clickevent() {
  var $
  $.ajax({
    url: "/test",
    context: document.body
  });
}

//Abrir pop up
function abrir1() {
  var btnAbrirPopup = document.getElementById('btn-abrir-popup1'),
    overlay = document.getElementById('overlay1'),
    popup = document.getElementById('popup1'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup1');

  btnAbrirPopup.addEventListener('click', function () {
    overlay.classList.add('active');
    popup.classList.add('active');
  });

  btnCerrarPopup.addEventListener('click', function (e) {
    e.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');
  });
}

function abrir2() {
  var btnAbrirPopup = document.getElementById('btn-abrir-popup2'),
    overlay = document.getElementById('overlay2'),
    popup = document.getElementById('popup2'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup2');

  btnAbrirPopup.addEventListener('click', function () {
    overlay.classList.add('active');
    popup.classList.add('active');
  });

  btnCerrarPopup.addEventListener('click', function (e) {
    e.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');
  });
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) =>
      dispatch(actions.authLogin(userName, password)),
    logout: () => dispatch(actions.logout()),
    signup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidepanel);
