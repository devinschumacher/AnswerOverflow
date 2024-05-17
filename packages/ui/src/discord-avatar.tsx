import type { DiscordAccountPublic } from '@answeroverflow/db';
import { AvatarProps } from './ui/avatar';
import { cn } from './utils/utils';
import Image from 'next/image';

export interface DiscordAvatarProps extends Omit<AvatarProps, 'alt' | 'url'> {
	user: DiscordAccountPublic;
}

const makeUserIconLink = (
	user: Pick<DiscordAccountPublic, 'id' | 'avatar'>,
	size: number = 64,
) => {
	if (user.avatar)
		return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`;
	return `/discord/${parseInt(user.id) % 5}.png`;
};

export function DiscordAvatar(props: DiscordAvatarProps) {
	const url = makeUserIconLink(props.user, props.size);
	const size = props.size || 64;
	const fallback = `/discord/${parseInt(props.user.id) % 5}.png`;
	return (
		<div>
			<object
				type="image/png"
				data={url}
				aria-label={props.user.name}
				className={cn(
					`aspect-square h-full w-full rounded-full w-[${size}px] h-[${size}px]`,
					props.className,
				)}
			>
				<Image
					src={fallback}
					alt={props.user.name}
					width={props.size}
					height={props.size}
					className={cn(
						'aspect-square h-full w-full rounded-full',
						props.className,
					)}
				/>
			</object>
		</div>
	);
}
