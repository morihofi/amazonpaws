import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBluesky, faGit, faGitAlt, faGithub, faMastodon} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
    return <div className="frame">
        <h1>Contributing</h1>
        <p>
            Thanks for your interest in contributing to Amazon Paws!
            You can send in actions of Amazon, or you want to report bugs or wrong information on this site,
            you can do so in various ways!
        </p>
        <h2>Submission of regarding behaviour of Amazon</h2>
        <p>
            I am very interested in anything not covered on the page already, especially outside of North America and the EEA.
            Please remember to add sources to your submissions.
        </p>
        <h2>Bug reports and feature requests</h2>
        <p>
            Please report any bugs of feature suggestions, too!
        </p>
        <h2>Contact details</h2>
        <p>You can write a private message on the social media channels:</p>
        <ul>
            <li><FontAwesomeIcon icon={faMastodon} /> Mastodon <a href="#" target="_blank">@amazonpaws@...</a></li>
            <li><FontAwesomeIcon icon={faBluesky} /> BlueSky <a href="#" target="_blank">@amazonpaws.com</a></li>
        </ul>
        <p>You can create issues at these code forges:</p>
        <ul>
            <li><FontAwesomeIcon icon={faGithub} /> <a href="https://github.com/varbin/amazonpaws/issues" target="_blank">Github</a></li>
            <li><FontAwesomeIcon icon={faGitAlt} /> <a href="https://codeberg.org/Varbin/amazonpaws/issues" target="_blank">Codeberg</a></li>
        </ul>
        <p>I am also reachable by e-mail:</p>
        <ul>
            <li><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:input@amazonpaws.com" target="_blank">input@amazonpaws.com</a></li>
        </ul>
    </div>
}