import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
      }
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@ecommerce.com',
      to: email,
      subject: 'E-posta Adresinizi Doğrulayın',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">E-posta Doğrulama</h2>
          <p>Hesabınızı doğrulamak için aşağıdaki butona tıklayın:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            E-posta Adresimi Doğrula
          </a>
          <p>Bu link 24 saat geçerlidir.</p>
          <p>Eğer bu e-postayı siz talep etmediyseniz, lütfen dikkate almayın.</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent to:', email);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Email gönderilemedi');
    }
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@ecommerce.com',
      to: email,
      subject: 'Şifre Sıfırlama',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Şifre Sıfırlama</h2>
          <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Şifremi Sıfırla
          </a>
          <p>Bu link 1 saat geçerlidir.</p>
          <p>Eğer şifre sıfırlama talebinde bulunmadıysanız, lütfen dikkate almayın.</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Email gönderilemedi');
    }
  }

  async sendOrderConfirmation(email: string, orderData: any): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@ecommerce.com',
      to: email,
      subject: 'Sipariş Onayı',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Siparişiniz Alındı!</h2>
          <p>Sipariş numaranız: <strong>#${orderData._id}</strong></p>
          <p>Toplam tutar: <strong>₺${orderData.totalAmount}</strong></p>
          <p>Siparişiniz başarıyla oluşturuldu. Kargo bilgileri size e-posta ile iletilecektir.</p>
          <p>Teşekkürler!</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent to:', email);
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
    }
  }
}

export default new EmailService(); 