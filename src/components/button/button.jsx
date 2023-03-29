import styles from "./button.module.scss";
export default function Button({
  children,
  disabled,
  isLoading,
  ...otherProps
}) {
  return (
    <button
      className={`${styles.button} ${
        (disabled || isLoading) && styles.disabled
      }`}
      disabled={disabled || isLoading}
      {...otherProps}
    >
      {children}
      {isLoading && <div className={styles.loader}></div>}
    </button>
  );
}
