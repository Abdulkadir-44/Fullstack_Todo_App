const jwt = require("jsonwebtoken")

const tokenVerification = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Unauthorized: Missing token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden : Invalid token" });

        req.user = decoded;
        next();
    })
}

module.exports = {tokenVerification}

/*

Token verification (token doğrulama) genellikle bir kullanıcıya veya uygulamaya ait bir token'ın (genellikle JSON Web Token - JWT) 
geçerliliğini kontrol etmek için kullanılır. Bu işlem, kullanıcının kimliğini doğrulamak ve yetkilendirme sağlamak için önemli bir adımdır. 


1. Token Alma
Kullanıcı bir oturum açma işlemi gerçekleştirdiğinde, sunucu genellikle bir token üretir. Bu token, kullanıcının kimliğini ve bazı bilgileri 
içerir.

2. Token'ı Kontrol Etme
Token doğrulama fonksiyonu, gelen isteklerdeki token'ı alır ve aşağıdaki adımları izler:

Token'ı Ayırma: Genellikle token, "Bearer" kelimesi ile birlikte gönderilir. Öncelikle bu kısmı ayırarak sadece token'ı alırsın.
Geçerlilik Süresi Kontrolü: Token'ın geçerlilik süresi dolup dolmadığını kontrol etmelisin. JWT token'larında bu bilgi exp (expiration) 
alanında bulunur.
İmzayı Kontrol Etme: Token'ın içeriğinin değiştirilmediğini doğrulamak için, token'ı oluştururken kullanılan gizli anahtar (secret key) ile 
token'ın imzasını kontrol etmelisin. Eğer imza doğrulanmazsa, token geçersizdir.
3. Kullanıcı Bilgilerini Çıkarma
Token doğrulandıktan sonra, içindeki kullanıcı bilgilerini (örneğin kullanıcı ID'si) çıkarabilirsin. Bu bilgiler genellikle token'ın "payload"
 kısmında bulunur.

4. Sonuç
Eğer tüm kontroller başarılıysa, kullanıcıya istek yaptığı kaynağa erişim izni verebilir, aksi takdirde bir hata mesajı dönebilirsin (örneğin, 
"Token geçersiz" ya da "Yetkisiz erişim").




*/