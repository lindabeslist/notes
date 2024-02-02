import styles from './ActiveNote.module.scss';
interface Props {
    color: string;
    text: string;
}
const ActiveNote = ({ color, text }: Props) => {
    return <span className={styles[`color--${color}`]}>{text}</span>;
};

export default ActiveNote;
