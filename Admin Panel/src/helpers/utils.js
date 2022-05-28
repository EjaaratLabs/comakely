// Used for feeding data to table  
function transformData(data) {
  return data.map((item, index) => {
    return {
      key: (index + 1).toString(),
      name: item,
    };
  });
}

export { transformData };
