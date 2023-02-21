import Dashboard from "./features/Dashboard/Dashboard";
import UserRegistration from "./features/users/UserRegistration";
import UserDetail from "./features/users/UserDetail";
import UserList from "./features/users/UserList";
// adicionar aqui o caminho para o component desejado. Senão não funciona !!

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/users/list", name: "Listagem de clientes", component: UserList },
  { path: "/users/registration", name: "Registar cliente", component: UserRegistration },
  { path: "/users/detail/:id", name: "Detalhes de cliente", component: UserDetail },

  // //rotas de utilizadores
  // {path: '/utilizadores', name:'Utilizadores', exact:true},
  // {path: '/utilizadores/gestao',name:'Gestão de Utilizadores',component: ListarUtilizador},
  // {path: '/utilizadores/editar/:id',name:'Editar Utilizador',component: Utilizador},
  // {path: '/utilizadores/registar',name:'Registar Utilizador',component: Utilizador},

  // //rotas de veiculos
  // {path: '/veiculos', name:'Veículos', exact:true},
  // {path: '/veiculos/gestao',name:'Gestão de Veículos',component: ListarVeiculo },
  // {path: '/veiculos/editar/:id',name:'Editar Veículo',component: RegistarVeiculo },
  // {path: '/veiculos/registar',name:'Registar Veículo',component: RegistarVeiculo},

  // // Reservas
  // {path: '/reservas',name:'Reservas',exact:true},
  // {path: '/reservas/gestao',name:'Gestão de Reservas',component: ListarReserva},
  // {path: '/reservas/editar/:id',name:'Editar Reserva',component: RegistarReserva},
  // {path: '/reservas/registar',name:'Registar Reserva',component: RegistarReserva},

  // // Viagens
  // {path: '/viagens/gestao',name:'Listar Viagem',component: ListarViagem},
  // {path: '/viagens/completar/:id',name:'Listar Viagem',component: FormViagem},
  // {path: '/viagens/Editar/:id',name:'Editar Viagem',component: EditarViagem},

  // // Mensagens suporte
  // {path: '/mensagens/gestao',name:'Listar Mensagens',component: ListarMensagem},
];

export default routes;
