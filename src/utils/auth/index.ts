export const checkIfUserHasPermissions = (
    permissionNeeded: string[],
): boolean => {
    // const { menu } = useContext(GlobalContext);
    const menu: any[] = [];

    if (!menu) return false;

    const menuAndActions = menu
        .map((data: any) =>
            data?.children?.map((item: any) => ({
                link: item.link,
                actions: item.actions,
            })),
        )
        .flat(2)
        .find((p: any) => window.location.pathname.startsWith(p?.link));

    if (!menuAndActions) return false;

    return permissionNeeded.every((p) => menuAndActions.actions.includes(p));
};
