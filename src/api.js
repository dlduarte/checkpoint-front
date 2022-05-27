import { logout } from './routes';

const HOST = process.env.VUE_APP_API_HOST;

export const auth_authenticate = `${HOST}/auth/authenticate`
export const auth_register = `${HOST}/auth/register`

export const activity_getAll = reference => `${HOST}/activity/${reference}`
export const activity_getSummary = reference => `${HOST}/activity/summary/${reference}`
export const activity_save = `${HOST}/activity/`
export const activity_update = `${HOST}/activity/`

export const setting_getAll = `${HOST}/settings`
export const setting_save = `${HOST}/settings`
export const setting_saveAll = `${HOST}/settings/all`

export const issue_getAll = `${HOST}/issue`
export const issue_applySpend = (projectId, issueId, duration) => `${HOST}/issue/spend?projectId=${projectId}&issueId=${issueId}&duration=${duration}`

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
        case 403:
            {
                error = "Sessão expirada!";
                logout();
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