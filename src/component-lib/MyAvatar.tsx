import Avatar, { Props as AvatarProps } from "./Avatar";

// ----------------------------------------------------------------------

type Props = AvatarProps & {
  avatarUrl: string;
  name?: string;
};

export default function MyAvatar({ avatarUrl, name, ...other }: Props) {
  return (
    <Avatar src={avatarUrl} alt={name} color="default" {...other}>
      {name}
    </Avatar>
  );
}
