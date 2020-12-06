const servers = {
  local: {
    mock: '//server.closertb.site/client',
    admin: 'http://local.closertb.site:8906/api', //
  },
  production: {
    mock: '//server.closertb.site/client',
    admin: '//deploy.closertb.site',
  },
};

const getServers = () => servers[process.env.NODE_ENV];

export default getServers;
