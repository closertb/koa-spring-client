const servers = {
  local: {
    mock: '//server.closertb.site/client',
    admin: 'http://localhost:3000', //
  },
  production: {
    mock: '//server.closertb.site/client',
    admin: '//deploy.closertb.site',
  },
};

const getServers = () => servers[process.env.NODE_ENV];

export default getServers;
