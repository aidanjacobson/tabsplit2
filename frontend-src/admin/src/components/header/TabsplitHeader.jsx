import LogoutButton from './LogoutButton';

import "./Header.scss";

import { usePromptHandlers } from "../prompt/prompt";
import StartNewTabButton from './StartNewTabButton';

import formatMoney from "../../../../common/formatmoney.js";

const TabsplitHeader = ({ name, balance, refresh }) => {
    let relationshipClassName = "even";
    if (balance < 0) relationshipClassName = "negative";
    if (balance > 0) relationshipClassName = "positive";

    const balanceClassName = `tabsplit-header-balance ${relationshipClassName}`;

    // dollar amount should be positive and two decimal places
    const formattedDollarAmount = formatMoney(balance);
    let formattedBalanceText = "The tab is even";
    if (balance < 0) formattedBalanceText = `You owe ${formattedDollarAmount}`;
    if (balance > 0) formattedBalanceText = `You are owed ${formattedDollarAmount}`;



    const { promptNumber, promptText } = usePromptHandlers();

    return (
        <div className="tabsplit-header">
            <div className="tabsplit-header-top">
                <h1>Hi, {name}</h1>
                <LogoutButton />
            </div>
            <div className={balanceClassName}>{formattedBalanceText}</div>
            <div className="tabsplit-header-start-new-tab">
                <StartNewTabButton refresh={refresh} />
            </div>
        </div>
    );
}

export default TabsplitHeader;