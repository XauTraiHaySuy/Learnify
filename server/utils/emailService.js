import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendApprovalEmail = async (email, name, username, plainPassword) => {
  try {
    const mailOptions = {
      from: '"Hỗ trợ Learnify" <' + process.env.EMAIL_USER + '>',
      to: email,
      subject: 'Tài khoản giáo viên của bạn đã được phê duyệt!',
      text: `Xin chào ${name},\n\nTài khoản giáo viên của bạn trên hệ thống Learnify đã được phê duyệt thành công.\n\nThông tin đăng nhập:\n- Tên đăng nhập / Email: ${username || email}\n- Mật khẩu: ${plainPassword}\n\nTruy cập vào trang web để đăng nhập: http://localhost:5173/login\n\nTrân trọng,\nĐội ngũ hỗ trợ Learnify`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Learnify</h2>
          <p>Xin chào <strong>${name}</strong>,</p>
          <p>Chúc mừng! Tài khoản giáo viên của bạn trên hệ thống Learnify đã được <strong>phê duyệt thành công</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Thông tin đăng nhập:</strong></p>
            <p style="margin: 5px 0;">Tên đăng nhập / Email: <strong>${username || email}</strong></p>
            <p style="margin: 5px 0;">Mật khẩu: <strong style="color: #2563eb;">${plainPassword}</strong></p>
          </div>
          
          <p>Bây giờ bạn có thể truy cập vào hệ thống để bắt đầu tạo khóa học.</p>
          
          <p style="margin: 30px 0;">
            <a href="http://localhost:5173/login" style="background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Nhấp vào đây để Đăng Nhập</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">Trân trọng,<br>Đội ngũ hỗ trợ Learnify</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email phê duyệt đã được gửi đến ${email}. Phản hồi từ Google: ${info.response}`);
  } catch (error) {
    console.error('Lỗi khi gửi email phê duyệt:', error);
  }
};

export const sendRejectionEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `"Learnify Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thông báo về yêu cầu đăng ký tài khoản giáo viên',
      html: `
        <h3>Xin chào ${name},</h3>
        <p>Cảm ơn bạn đã quan tâm và đăng ký trở thành giáo viên trên hệ thống Learnify.</p>
        <p>Tuy nhiên, sau quá trình xét duyệt, chúng tôi rất tiếc phải thông báo rằng tài khoản của bạn chưa đáp ứng đủ điều kiện của hệ thống lúc này và đã bị từ chối.</p>
        <br>
        <p>Trân trọng,</p>
        <p>Đội ngũ quản trị Learnify</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email từ chối đã được gửi đến ${email}`);
  } catch (error) {
    console.error('Lỗi khi gửi email từ chối:', error);
  }
};
