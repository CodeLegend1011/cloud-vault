![image](https://github.com/user-attachments/assets/b49d417c-0521-45f8-953f-ea1a6682645a)
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

---
## 🖼️ Images & UI Previews

| 💻 OwnCloud Dashboard | 🔐 OwnCloud Dashboard |
|------------------------|------------------------|
| ![OwnCloud](https://github.com/user-attachments/assets/cf8fbd6f-08c6-4839-9cf5-0c2c56bd50a0) | ![image](https://github.com/user-attachments/assets/b55b5128-dde6-44e5-a7d1-038430fc2efe) |

---

| 💻 Website Landing Page | 🔐 Login Page |
|------------------------|------------------------|
| ![image](https://github.com/user-attachments/assets/0fe2460c-772b-4451-9f61-530587706851) | ![image](https://github.com/user-attachments/assets/86423047-cdb7-4a65-b54f-1bac5a24806d) |

---

| 📝 Register Page | 📤 File Upload Interface |
|------------------|--------------------------|
| ![Register Page](https://github.com/user-attachments/assets/41885850-bf6a-42a4-81ba-84a71badba89) | ![File Upload](https://github.com/user-attachments/assets/16638755-084a-4be8-964c-15c5f99a2e0f) |

---

| 📂 File Listing  ⬇️ File Download |
|------------------------------------|
| ![File Download](https://github.com/user-attachments/assets/6983823b-0ecd-4ea1-a5c2-07762b140748) |

---

## 🤝 Contribution

Pull requests are welcome! For major changes, open an issue first to discuss.

---

## 📄 License

MIT License. See `LICENSE` for details.

---

