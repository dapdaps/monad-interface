import clsx from "clsx";

const PlayerAvatar = (props: any) => {
  const { avatar, className, avatarClassName } = props;

  return (
    <div
      className={clsx(
        "relative w-[50px] h-[50px] rounded-[10px] bg-no-repeat bg-center bg-contain",
        className,
        !avatar ? "bg-[url('/images/mainnet/arcade/guess-who/avatar-user-empty.png')]" : "",
      )}
      style={avatar ? {
        backgroundImage: `url('/images/mainnet/arcade/guess-who/${avatar}')`,
      } : {}}
    >
      <img
        src="/images/mainnet/arcade/guess-who/avatar-monster-empty.png"
        alt=""
        className={clsx(
          "w-[39px] h-[30px] object-center object-contain shrink-0 absolute top-[-10px] right-[-16px]",
          avatarClassName,
        )}
      />
    </div>
  );
};

export default PlayerAvatar;
