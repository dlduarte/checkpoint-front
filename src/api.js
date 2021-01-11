const BASE = 'http://localhost:9100';
//const BASE = 'http://35.199.121.110:9001';

export const auth_authenticate = `${BASE}/auth/authenticate`
export const auth_register = `${BASE}/auth/register`

export const activity_getAll = reference => `${BASE}/activity/${reference}`
export const activity_getSummary = reference => `${BASE}/activity/summary/${reference}`
export const activity_save = `${BASE}/activity/`
export const activity_update = `${BASE}/activity/`

export const errorHandling = err => {
    let error = "";

    if (!err.response) {
        if (err.message === 'Network Error') {
            return "Falha de conexão.";
        }
        return err.message;
    }

    switch (err.response.status) {
        case 400:
            {
                if (err.response.data && err.response.data.messages) {
                    err.response.data.messages.forEach(message => {
                        error += ` ${message}.`;
                    });
                } else {
                    error = "Preencha todos os dados.";
                }
                break;
            }
        case 401:
            {
                const err0 = err.response.data.messages[0];

                switch (err0) {
                    case "User credentials have expired":
                        error = "Senha expirada.";
                        break;
                    case "User account is locked":
                        error = "Usuário bloqueado.";
                        break;
                    case "Bad credentials":
                        error = "Usuário ou senha inválida.";
                        break;
                    case "User is disabled":
                        error = "Conta não confirmada."
                        break;
                    default:
                        error = err0;
                        break;
                }

                break;
            }
        case 500:
            {
                error = err.response.data.message;
                break;
            }
        default:
            error = err.message;
            break;
    }

    return error;
}