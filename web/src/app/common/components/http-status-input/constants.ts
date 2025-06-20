export interface IStatusValue {
  value: number;
  title: string;
}

export interface IStatusesGroup {
  group: string;
  values: IStatusValue[];
}

export const STATUSES_GROUPS: IStatusesGroup[] = [
  {
    group: '1xx: Informational (информационные)',
    values: [
      { value: 100, title: '100 Continue («продолжайте»)' },
      { value: 101, title: '101 Switching Protocols («переключение протоколов»)' },
      { value: 102, title: '102 Processing («идёт обработка»)' },
      { value: 103, title: '103 Early Hints («предварительный ответ»)' },
    ],
  },
  {
    group: '2xx: Success (успешно)',
    values: [
      { value: 200, title: '200 OK («хорошо»)' },
      { value: 201, title: '201 Created («создано»)' },
      { value: 202, title: '202 Accepted («принято»)' },
      { value: 203, title: '203 Non-Authoritative Information («информация не авторитетна»)' },
      { value: 204, title: '204 No Content («нет содержимого»)' },
      { value: 205, title: '205 Reset Content («сбросить содержимое»)' },
      { value: 206, title: '206 Partial Content («частичное содержимое»)' },
      { value: 207, title: '207 Multi-Status («многостатусный»)' },
      { value: 208, title: '208 Already Reported («уже сообщалось»)' },
      { value: 226, title: '226 IM Used («использовано IM»)' },
    ],
  },
  {
    group: '3xx: Redirection (перенаправление)',
    values: [
      { value: 300, title: '300 Multiple Choices («множество выборов»)' },
      { value: 301, title: '301 Moved Permanently («перемещено навсегда»)' },
      { value: 302, title: '302 Found («найдено»)' },
      { value: 303, title: '303 See Other («смотреть другое»)' },
      { value: 304, title: '304 Not Modified («не изменялось»)' },
      { value: 305, title: '305 Use Proxy («использовать прокси»)' },
      { value: 306, title: '306 — зарезервировано (код использовался только в ранних спецификациях)' },
      { value: 307, title: '307 Temporary Redirect («временное перенаправление»)' },
      { value: 308, title: '308 Permanent Redirect («постоянное перенаправление»)' },
    ],
  },
  {
    group: '4xx: Client Error (ошибка клиента)',
    values: [
      { value: 400, title: '400 Bad Request («неправильный, некорректный запрос»)' },
      { value: 401, title: '401 Unauthorized («не авторизован»)' },
      { value: 402, title: '402 Payment Required («необходима оплата»)' },
      { value: 403, title: '403 Forbidden («запрещено (не уполномочен)»)' },
      { value: 404, title: '404 Not Found («не найдено»)' },
      { value: 405, title: '405 Method Not Allowed («метод не поддерживается»)' },
      { value: 406, title: '406 Not Acceptable («неприемлемо»)' },
      { value: 407, title: '407 Proxy Authentication Required («необходима аутентификация прокси»)' },
      { value: 408, title: '408 Request Timeout («истекло время ожидания»)' },
      { value: 409, title: '409 Conflict («конфликт»)' },
      { value: 410, title: '410 Gone («удалён»)' },
      { value: 411, title: '411 Length Required («необходима длина»)' },
      { value: 412, title: '412 Precondition Failed («условие ложно»)' },
      { value: 413, title: '413 Payload Too Large («полезная нагрузка слишком велика»)' },
      { value: 414, title: '414 URI Too Long («URI слишком длинный»)' },
      { value: 415, title: '415 Unsupported Media Type («неподдерживаемый тип данных»)' },
      { value: 416, title: '416 Range Not Satisfiable («диапазон не достижим»)' },
      { value: 417, title: '417 Expectation Failed («ожидание не оправдалось»)' },
      { value: 418, title: '418 I’m a teapot («я — чайник»)' },
      { value: 419, title: '419 Authentication Timeout (not in RFC 2616) («обычно ошибка проверки CSRF»)' },
      { value: 421, title: '421 Misdirected Request' },
      { value: 422, title: '422 Unprocessable Entity («необрабатываемый экземпляр»)' },
      { value: 423, title: '423 Locked («заблокировано»)' },
      { value: 424, title: '424 Failed Dependency («невыполненная зависимость»)' },
      { value: 425, title: '425 Too Early («слишком рано»)' },
      { value: 426, title: '426 Upgrade Required («необходимо обновление»)' },
      { value: 428, title: '428 Precondition Required («необходимо предусловие»)' },
      { value: 429, title: '429 Too Many Requests («слишком много запросов»)' },
      { value: 431, title: '431 Request Header Fields Too Large («поля заголовка запроса слишком большие»)' },
      { value: 449, title: '449 Retry With («повторить с»)' },
      { value: 451, title: '451 Unavailable For Legal Reasons («недоступно по юридическим причинам»)' },
      { value: 499, title: '499 Client Closed Request (клиент закрыл соединение)' },
    ],
  },
  {
    group: '5xx: Server Error (ошибка сервера)',
    values: [
      { value: 500, title: '500 Internal Server Error («внутренняя ошибка сервера»)' },
      { value: 501, title: '501 Not Implemented («не реализовано»)' },
      { value: 502, title: '502 Bad Gateway («плохой, ошибочный шлюз»)' },
      { value: 503, title: '503 Service Unavailable («сервис недоступен»)' },
      { value: 504, title: '504 Gateway Timeout («шлюз не отвечает»)' },
      { value: 505, title: '505 HTTP Version Not Supported («версия HTTP не поддерживается»)' },
      { value: 506, title: '506 Variant Also Negotiates («вариант тоже проводит согласование»)' },
      { value: 507, title: '507 Insufficient Storage («переполнение хранилища»)' },
      { value: 508, title: '508 Loop Detected («обнаружено бесконечное перенаправление»)' },
      { value: 509, title: '509 Bandwidth Limit Exceeded («исчерпана пропускная ширина канала»)' },
      { value: 510, title: '510 Not Extended («не расширено»)' },
      { value: 511, title: '511 Network Authentication Required («требуется сетевая аутентификация»)' },
      { value: 520, title: '520 Unknown Error («неизвестная ошибка»)' },
      { value: 521, title: '521 Web Server Is Down («веб-сервер не работает»)' },
      { value: 522, title: '522 Connection Timed Out («соединение не отвечает»)' },
      { value: 523, title: '523 Origin Is Unreachable («источник недоступен»)' },
      { value: 524, title: '524 A Timeout Occurred («время ожидания истекло»)' },
      { value: 525, title: '525 SSL Handshake Failed («квитирование SSL не удалось»)' },
      { value: 526, title: '526 Invalid SSL Certificate («недействительный сертификат SSL»)' },
    ],
  },
];
