import { Routes } from './routes';
import { UsuarioLogadoProvider } from './shared/contexts';

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <style type="text/css"></style>
      <Routes />
    </UsuarioLogadoProvider>
  );
};
