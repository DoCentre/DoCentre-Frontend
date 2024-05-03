<h1 align="center"><i>Docentre-Frontend</i></h1>

---

<p align="center">
    <i>A unified platform streamlining viewing, editing, and approval processes for complex documents across all sectors.</i>
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [License](#license)

## 🧐 About <a name = "about"></a>

_DoCentre_, **Do**cument **Centre**, is a robust document management platform designed to streamline the complexities of document handling within enterprises. From production processes to machine specifications, _DoCentre_ offers a unified solution for managing diverse document types efficiently. With features facilitating viewing, editing, and approval processes all in one place, _DoCentre_ empowers users to seamlessly collaborate and ensure document integrity.

> [!note]
> _DoCentre-Frontend_ is developed as the course project for the "Cloud Native Development: toward best practice" course at National Yang Ming Chiao Tung University (NYCU).

# 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) is used to run the server and database in containers with uniform environments.

### Starting the Server

1. Clone the repository (or download the _ZIP_ file):

```bash
$ git clone https://github.com/DoCentre/DoCentre-Frontend.git
```

2. Change into the project directory:

```bash
cd DoCentre-Frontend
```

3. Edit `.env`:

```bash
cp .env.example .env
vim .env
```

```
VUE_APP_HOST={IP/Domain}
VUE_APP_GOOGLE_CLIENT_ID={Google Client ID}
```

More information about [Google Client ID](https://console.cloud.google.com/apis/credentials)

4. Run the containers:

```bash
docker compose up
```

The server should now be running on `{IP/Domain}:5173`:

## ✍️ License <a name = "license"></a>

_DoCentre-Frontend_ is licensed under the [MIT License](LICENSE).
