interface Props {
  src: string;
  size: string;
}

const ProfileImage = ({ src, size }: Props) => {
	return (
		<img
			src={`${process.env.NEXT_PUBLIC_HOST}/api/file` + src}
			style={{ borderRadius: '50%', objectFit: 'cover',  minHeight: size, minWidth: size, maxHeight: size, maxWidth: size }}
		/>
	);
};

export default ProfileImage;