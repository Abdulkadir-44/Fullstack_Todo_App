export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const getTimeOfDay = () => {
  const hours = new Date().getHours().toLocaleString();
  if (hours === '05' || hours === '12') return 'Good morning'
  else if (hours > '12' || hours === '17') return 'Good afternoon'
  else if (hours > '17' || hours === '21') return 'Good evening'
  else return 'Good night'

}

export function getFormattedDate(createdDate = null) {
  // Eğer createdDate varsa kullan, yoksa bugünün tarihini kullan
  const date = createdDate ? new Date(createdDate) : new Date();

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  // Gün sırasını belirlemek için
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Özel durum: 11-20 arası
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
}

export function formatMongoDateForInput(mongoDate) {
  if (!mongoDate) return "";
  /*
  padStart, bir string'in uzunluğunu belirtilen bir değere kadar doldurur (örneğin, boşluk veya sıfır ekleyerek).
  JavaScript'te String() fonksiyonu, bir değeri string (yani metin) türüne dönüştürür.
  */
  const date = new Date(mongoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ay 0-11 arasında olduğu için +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


export function getTasksStatusCount(tasks) {
  const tasksStatusCount = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc;
  }, {})

  return tasksStatusCount;
}

export function getTasksStatusCountForDay(tasks, dayKey) {
  const tasksForDay = tasks.filter(task => new Date(task?.createdAt).toDateString() === dayKey);
  const tasksStatusCount = tasksForDay.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return tasksStatusCount;
}

export function getCalendarStatistics(tasks) {
  const events = [];

  const groupedTasks = new Map();

  tasks.forEach(task => {
    const startDateKey = new Date(task?.createdAt).toDateString(); // Başlangıç tarihini al
    const status = task?.status; // Todo'nun durumunu al

    const taskCounts = getTasksStatusCountForDay(tasks, startDateKey)

    // Eğer bu tarihte daha önce bir task yoksa veya o status'a ait bir task yoksa ekle
    if (!groupedTasks.has(startDateKey)) {
      groupedTasks.set(startDateKey, new Set());
    }

    if (!groupedTasks.get(startDateKey).has(status)) {
      groupedTasks.get(startDateKey).add(status);

      if (status == "completed") {
        events.push({
          start: task?.createdAt,
          status: status,
          title: task?.title,
          count: taskCounts?.completed
        });
      } else if (status == "inprogress") {
        events.push({
          start: task?.createdAt,
          status: status,
          title: task?.title,
          count: taskCounts?.inprogress
        });
      } else {
        events.push({
          start: task?.createdAt,
          status: status,
          title: task?.title,
          count: taskCounts?.pending
        });
      }
    }

  });

  return events
}

export const getChangedFields = (data, originalData) => {
  // Değişen özellikleri tespit et
  const changedFields = {};
  for (const key in data) {
    if (data[key] !== originalData[key]) {
      changedFields[key] = data[key];
    }
  }
  return changedFields;
};