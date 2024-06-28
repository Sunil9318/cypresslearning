const getProfile = async () => {
  return $("id=MenuItem-user");
};

export const settingsScreen = {
  tapOnProfileOption: async () => {
    (await getProfile()).click();
  },
};
