const nodemailer = require('nodemailer')


class MailService {
        constructor(){
        this.transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:true,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationLink(to , link){
            try{
                await this.transporter.sendMail({
                    from:process.env.SMTP_USER,
                    to:to,
                    subject:'Активация аккаунта',
                    html:`
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0a1a; border-radius: 16px; overflow: hidden;">
                                
                                <div style="background: linear-gradient(135deg, #8B5CF6, #6366F1); padding: 2rem; text-align: center;">
                                <h1 style="color: #fff; margin: 0; font-size: 1.8rem; letter-spacing: 1px;">
                                    Connecti<span style="color: #f0abfc;">Q</span>
                                </h1>
                                </div>

                                <div style="padding: 2.5rem 2rem; color: #e2e8f0;">
                                <h2 style="margin: 0 0 1rem; font-size: 1.4rem; color: #fff;">
                                    Подтвердите email 👋
                                </h2>
                                <p style="margin: 0 0 2rem; opacity: 0.7; line-height: 1.6;">
                                    Спасибо за регистрацию! Нажмите кнопку ниже чтобы активировать аккаунт.
                                </p>
                                <a href="${link}" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #6366F1); color: #fff; text-decoration: none; padding: 0.9rem 2rem; border-radius: 10px; font-weight: 600; font-size: 1rem;">
                                    Активировать аккаунт
                                </a>
                                </div>

                                <div style="padding: 1.5rem 2rem; border-top: 1px solid #1e1b4b; text-align: center;">
                                <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
                                    Если вы не регистрировались — просто проигнорируйте это письмо
                                </p>
                                </div>

                            </div>
                            `
                })

            }catch(e){

                throw new Error(e.message)
            }
    } 
}

module.exports = new MailService()