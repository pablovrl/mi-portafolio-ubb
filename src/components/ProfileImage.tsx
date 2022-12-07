interface Props {
  src: string;
  size: string;
}

const ProfileImage = ({ src, size }: Props) => {
	return (
		<img
			src={`${process.env.NEXT_PUBLIC_DEPLOY}/api/file` + src}
			style={{ borderRadius: '50%', objectFit: 'cover', height: size, width: size }}
		/>
	);
};

export default ProfileImage;