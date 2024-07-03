# Проект "Место"
  Пет-проект
  
  Проект предоставляет пользователю возможность создать собственную фотогалерею посещенных мест.
  
  В рамках приложения выполняется авторизации и регистрации пользователей, проводятся операции с карточками и пользователями (удаление, добавление).
  Информация сохраняется в локальной базе данных. 

## Применяемые технологии
* JavaScript
* HTML
* CSS
* React
* Node.js
* express.js
* MongoDB

В приложении используется работа с элементамы DOM, отправка и обработка данных формы input, валидация форм ввода данных, работа с классами, работа с API.

## Инструкция по развертыванию

  Репозиторий для приложения проекта `Mesto`, включает в себя фронтенд и бэкенд части приложения со следующими возможностями.
  Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.
  После клонирования проекта внутри каждой директории выполнить команду ```npm install``` для установки необходимых зависимостей.
  Для работы приложения потребуется установить локально и подключить базу данных MongoDB, в соответствии с официальной [документацией](https://www.mongodb.com/docs/).
  Для запуска серверной части внутри папки `backend/` выполнить команду `npm run start`.
  Для запуска фронт-части части внутри папки `frontend/` выполнить команду `npm run start`.


## Планы по доработке
1. Добавить возможность оставлять коментации к карточкам.
1. Добавить поддержку Redux;
1. Переписать приложение с использованием TypeScript;
1. Упаковать приложение в Doker;
