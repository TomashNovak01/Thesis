const { Menu, shell, app } = require("electron");
const path = require("path");

function setMenu(mainWindow) {
  const templates = {
    web: [
      {
        label: "Настольная версия",
        click: () => {
          if (process.env.NODE_ENV === "development") {
            const rendererPort = process.argv[2];
            mainWindow.loadURL(`http://localhost:${rendererPort}`);
          } else
            mainWindow.loadFile(
              path.join(app.getAppPath(), "renderer", "index.html")
            );

          useTemplate("desktop");
        },
      },
    ],
    desktop: [
      {
        label: "Веб версия",
        click: () => {
          if (process.env.NODE_ENV === "development")
            mainWindow.loadURL("http://localhost:3000");
          else mainWindow.loadURL("http://localhost:3000"); // ссылка на сайт

          useTemplate("web");
        },
      },
      {
        label: "Открыть файл",
        click: () => {
          mainWindow.webContents.send("triggerSelectFileDialog");
        },
      },
    ],
  };

  const common = [
    {
      label: "Страница",
      submenu: [
        { role: "reload", label: "Обновить" },
        { role: "forceReload", label: "Обновить принудительно" },
        { role: "toggleDevTools", label: "Консоль разработчика" },
        { role: "separator" },
        { role: "resetZoom", label: "Сбросить масштаб" },
        { role: "zoomIn", label: "Увеличить масштаб" },
        { role: "zoomOut", label: "Уменьшить масштаб" },
        { role: "separator" },
        { role: "toggleFullScreen", label: "Полноэкранный режим" },
      ],
    },
  ];

  const useTemplate = (id) => {
    const temp = [...templates[id], ...common];
    const menu = Menu.buildFromTemplate(temp);

    Menu.setApplicationMenu(menu);
  };

  useTemplate("web");
}

exports.setMenu = setMenu;
