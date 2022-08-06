export const formatContactMessage = (message,mail, name, lastname) => {
    const date = new Date().toLocaleString()
    return '[MAIL_EXP: '+mail+'] <br/>'+'[NOM_EXP: '+sanitizeString(lastname)+']<br/>'+'[PRENOM_EXP: '+sanitizeString(name)+']<br/>'+'[DATE: '+date+']<br/>'+'[MESSAGE: '+sanitizeString(message)+']'
} 

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}