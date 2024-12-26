# Notes-app nedir ?
Bu uygulama kullanıcıların kayıt işlemleri yapabildiği ve bu kayıt sonucu not alabildiği,notlarını silebildiği,notlarını güncelleyebildiği bir not alma uygulamasıdır.Kullanıcı dostu bir arayüze sahiptir aynı zamanda responsive tasarıma sahiptir yani mobil,table,bilgisayar görünümleri farklıdır. 

## İçindekiler
- [Başlarken](#başlarken)
- [Önkoşullar](#önkoşullar)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [İletişim](#iletişim)

## Başlarken

Bu kılavuz, yerel makinenizde React ve Express tabanlı web sitesi projenizi çalıştırmaya başlamanız için size yol gösterecektir.

### Önkoşullar

Projeyi çalıştırmak için aşağıdaki yazılımlara ihtiyacınız olacak:

- Node.js (https://nodejs.org)
- npm veya yarn (Node.js ile birlikte gelir)
- Git (https://git-scm.com)

### Kurulum

Projenizi yerel makinenizde kurmak için aşağıdaki adımları takip edin:

1. **Bu projeyi klonlayın:**

    ```bash
    git clone https://github.com/Abdulkadir-44/fullstack-notes-app.git
    Projemizde 2 ana klasör var backend ve frontend hangisinden başlamak isterseniz ona göre "cd klasör_adi" komutunu kullanınız
    ```

2. **Bağımlılıkları yükleyin:**

    Hem istemci (frontend) hem de sunucu (backend) bağımlılıklarını yüklemeniz gerekecek.

    ```bash
    # İstemci (frontend) bağımlılıklarını yükleyin
    cd frontend
    npm install
    # veya yarn kullanıyorsanız
    yarn install

    # Ana dizine geri dönün ve sunucu (backend) bağımlılıklarını yükleyin
    cd ..
    cd backend
    npm install
    # veya yarn kullanıyorsanız
    yarn install
    ```

3. **Ortam değişkenlerini ayarlayın:**

    Projenin kök dizininde(frontend ve backend için ayrı ayrı) bir `.env` dosyası oluşturun ve gerekli ortam değişkenlerini ekleyin. Örneğin:

    ```dotenv
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Veritabanını başlatın (opsiyonel):**

    Eğer MongoDB kullanıyorsanız, yerel olarak veya MongoDB Atlas gibi bir hizmet üzerinden bir veritabanı başlatın ve bağlantı dizgesini `.env` dosyasına ekleyin.

5. **Uygulamayı başlatın:**

    Hem istemci hem de sunucu uygulamasını  başlatmak için:

    ```bash
    #frontend için
    npm run dev
    # veya yarn kullanıyorsanız
    yarn dev
    ```
    ```bash
    #backend için
    npm start
    # veya yarn kullanıyorsanız
    yarn start
    ```

    Bu komutlar, istemci uygulamasını `http://localhost:3000` adresinde ve sunucu uygulamasını `http://localhost:5000` adresinde çalıştıracaktır.

### Kullanım

Projenizin çalışır durumda olduğunu doğrulamak için tarayıcınızda `http://localhost:3000` adresine gidin. API istekleri `http://localhost:5000` adresinden yapılacaktır.

## Kullanılan Teknolojiler

| Teknoloji        | Açıklama                                                          |
| ---------------- | ----------------------------------------------------------------- |
| [React](https://reactjs.org/)            | Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi |
| [Express](https://expressjs.com/)        | Node.js için hızlı, minimal ve esnek web framework               |
| [MongoDB](https://www.mongodb.com/)      | Belge tabanlı NoSQL veritabanı yönetim sistemi                    |
| [Node.js](https://nodejs.org/)           | Sunucu tarafı JavaScript çalıştırma ortamı                        |
| [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/) | Node paket yöneticileri                                           |
| [JWT](https://jwt.io/)                   | JSON Web Tokens ile kimlik doğrulama                             |
| [Axios](https://axios-http.com/)         | HTTP isteklerini yapmak için kullanılan Promise tabanlı kütüphane |
| [Babel](https://babeljs.io/)             | Modern JavaScript kodunu tarayıcılar tarafından anlaşılır hale getiren transcompiler    |
| [Webpack](https://webpack.js.org/)       | Modül paketleyici, varlıkları ve bağımlılıkları yönetir          |

Sorularınız için iletişim bilgileri:

- **Email**: abdulkadirozenc5371@gmail.com
- **GitHub**: [Abdulkadir-44](https://github.com/Abdulkadiir-44)
