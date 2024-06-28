const getSaveTeamButton = async () => {
  return $("id=Save Team");
};

const getSelectAllButton = async () => {
  return $("id=Select all");
};

export const assignTeamScreen = {
  selectAndSaveTeam: async () => {
    const selectAllButton = await getSelectAllButton();
    await selectAllButton.waitForDisplayed({ timeout: 5000 });
    await selectAllButton.click();
    await (await getSaveTeamButton()).click();
  },
};
