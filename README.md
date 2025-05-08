![image](https://github.com/user-attachments/assets/4a0d7994-8600-4815-b4a5-bda08e0f660c)

# 📁 Role-Based Secure Document Vault with Share Controls

A secure and self-hosted cloud-based document vault that allows **role-based file access**, **encrypted storage**, and **user-to-user file sharing** using **OwnCloud**, **Docker**, **Node.js**, and **MongoDB**, with a fully customized **frontend UI** for professional file management.

---

## 🚀 Features

- 🔐 Role-Based Access Control (Admin, User, Viewer)
- 🔄 Encrypted file uploads and downloads via OwnCloud (WebDAV)
- 🧑‍🤝‍🧑 Secure file sharing between users with access restrictions
- 🖥️ Professional frontend UI (Landing page, Login, Dashboard)
- 📂 User-specific file storage and access using MongoDB
- 📦 Docker-based OwnCloud + MariaDB server setup
- 💡 Future-ready: Integrate notifications, audit logging, or AI document scanning

---

## 🧰 Tech Stack

| Category      | Technology                |
|---------------|---------------------------|
| Cloud Storage | [OwnCloud](https://owncloud.com/) |
| Backend       | Node.js, Express.js       |
| Frontend      | HTML, CSS, JavaScript     |
| Database      | MongoDB                   |
| Protocol      | WebDAV (for file ops)     |
| Auth          | MongoDB-based Custom Auth |
| Containerization | Docker, Docker Compose |

---

## 🖼️ UI Screens (Coming Soon)

- Landing Page
- Login Page
- Dashboard (Role-based file access + Upload interface)

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

- Docker & Docker Compose installed ([Get Docker](https://www.docker.com/products/docker-desktop/))
- Node.js (v18 or higher) and npm
- MongoDB (Local or Atlas cloud instance)

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/document-vault-owncloud.git
cd document-vault-owncloud
```

---

### 3️⃣ Setup OwnCloud with Docker

Navigate to the `owncloud-docker` folder (or create it) and create a `docker-compose.yml`:

```yaml
version: '3'

services:
  owncloud:
    image: owncloud/server
    container_name: owncloud
    restart: always
    ports:
      - 8080:8080
    environment:
      - OWNCLOUD_DOMAIN=localhost
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=admin
      - OWNCLOUD_DB_TYPE=mysql
      - OWNCLOUD_DB_NAME=owncloud
      - OWNCLOUD_DB_USERNAME=owncloud
      - OWNCLOUD_DB_PASSWORD=owncloud
      - OWNCLOUD_DB_HOST=db
    depends_on:
      - db
    volumes:
      - owncloud_files:/mnt/data

  db:
    image: mariadb
    container_name: owncloud-db
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=owncloud
      - MYSQL_USER=owncloud
      - MYSQL_PASSWORD=owncloud
    volumes:
      - db_data:/var/lib/mysql

volumes:
  owncloud_files:
  db_data:
```

Start containers:

```bash
docker-compose up -d
```

Visit: [http://localhost:8080](http://localhost:8080) and set up OwnCloud admin user if not auto-created.

---

### 4️⃣ Setup Backend

Navigate to the `backend` folder:

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/documentVault
OWNCLOUD_URL=http://localhost:8080/remote.php/dav/files/
OWNCLOUD_USERNAME=admin
OWNCLOUD_PASSWORD=admin
```

Start the server:

```bash
npm run dev
```

---

### 5️⃣ Setup Frontend

Navigate to the `frontend` folder:

```bash
cd frontend
# If using plain HTML/CSS/JS:
# Just open index.html in your browser
# OR use live-server or serve:
npx serve .
```

If you’re using a framework (e.g. React):

```bash
npm install
npm start
```

---

## 📤 Usage

### 🔑 Login/Register

- Users can register and log in via the custom frontend
- Backend verifies credentials using MongoDB

### 📁 File Upload/Download

- Authenticated users can upload files through the UI
- Backend handles file upload via WebDAV to OwnCloud server
- Users see only the files they have access to (based on role)

### 🔄 File Sharing

- Admin or file owner can share files with other users
- File access is granted via backend role validation
- Download links are secured by access level

---

## 🧪 Testing

Use Postman or browser to test API endpoints:

- `POST /api/register`
- `POST /api/login`
- `POST /api/upload`
- `GET /api/files`
- `POST /api/share`

---

## 🛡️ Security & Notes

- 🔐 Passwords are securely hashed
- 🔒 File access is limited based on roles
- ✅ Input validation & sanitization applied
- 📁 Only users with valid roles can view/upload/download/share files

---

## 🛠️ Roadmap

- [ ] Implement real-time notifications
- [ ] Add audit logging for file activity
- [ ] Integrate OTP/email verification
- [ ] Role management UI for Admin
- [ ] Upgrade to React frontend with animations

## 🖼️ Images & UI Previews

| 💻 OwnCloud Access | 🔐 OwnCloud Dashboard |
|------------------------|------------------------|
| ![OwnCloud Access](https://github.com/user-attachments/assets/3a35bf34-a71e-453f-820d-3c76d1036a3a) | ![OwnCloud Dashboard](https://github.com/user-attachments/assets/4a354835-7da1-469e-a18d-9f0ee330d8e4) |

---

| 💻 Website Landing Page | 🔐 User Authorization |
|------------------------|------------------------|
| ![Website Landing Page](https://github.com/user-attachments/assets/4a0d7994-8600-4815-b4a5-bda08e0f660c) | ![User Authorization](https://github.com/user-attachments/assets/6223ed80-da74-462c-9fdd-592ab811a08b) |

---

| 📝 File Upload Interface | 📤 Admin Role Management |
|--------------------------|--------------------------|
| ![File Upload Interface](https://github.com/user-attachments/assets/49e497eb-4519-47c4-ac28-fc62101156f3) | ![Admin Role Management](https://github.com/user-attachments/assets/10fdcf04-13f9-4697-bf84-78abf39ddf0a) |

---

| 📂 File Listing & File Download |
|------------------------------------|
| ![File Listing & Download](https://github.com/user-attachments/assets/c325b9a8-9d90-4598-b03a-396c870a7ba8) |

## 🤝 Contribution

Pull requests are welcome! For major changes, open an issue first to discuss.

---

## 📄 License

MIT License. See `LICENSE` for details.

---

