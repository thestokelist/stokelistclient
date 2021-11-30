import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function Commandments() {
    return (
        <Fragment>
            <div className="title">Stoke List Commandments</div>
            <p>Hello Revelstoke folks,</p>
            <p>
                Whether you’re a new or long-time reader, welcome to the Stoke
                List. This is a vibrant online community – it’s a buy and sell
                site, it’s a forum, it’s a giant lost and found, it’s a place to
                advertise events, sales, and so much more. Half the community
                visits this site on a daily basis, so thanks for dropping in.
                Please use the site for good and keep it positive.
            </p>
            <p>Stoke List rules to live by: </p>
            <p>
                <ul>
                    <li>
                        IF YOU DON’T HAVE ANYTHING NICE TO SAY, DON’T SAY
                        ANYTHING AT ALL. Think before you write. Simmer down.
                        Didn’t your mom teach you not to be cruel to others? If
                        she’d be shocked, embarrassed or appalled at what you’ve
                        written, don’t post it.{' '}
                    </li>
                    <li>
                        No defamation. Libel is a written statement about a
                        person that damages the person’s reputation. Libel will
                        not be accepted. Got a problem with a business? Contact
                        them directly to rationally discuss your specific
                        concerns. Problem with a person? Talk to them
                        personally. Don’t post it on the Stoke List. Also, stop
                        having problems with people. Seriously – you’re a
                        grownup. Maybe the problem is you. Libel isn’t
                        necessarily the same as having a critical opinion, but
                        if the claim is written to hurts someone’s reputation
                        that is not acceptable. No profanity or obscenity.
                    </li>
                    <li>
                        Whether it’s in the title or the post, if your ad
                        contains profanity it will be deleted.
                    </li>
                    <li>
                        Don’t use anonymity to be a jerk. Just because you don’t
                        have to sign your name, don’t use that anonymity to say
                        things you wouldn’t otherwise say.
                    </li>
                    <li>
                        Don’t post to incite hatred. That means posts designed
                        specifically to stir the pot. You know who you are.
                    </li>
                    <li>
                        Xenophobia will never be tolerated. Xenophobia is an
                        unreasonable fear or hatred of strangers or foreigners
                        or of that which is strange or foreign. It shows just
                        how small you are. This town strives to be welcoming and
                        inclusive and you should too. You’d be a lot happier!
                        Posts cannot incite crime or make threats.
                    </li>
                    <li>
                        I’m the Stoke List mom. I check the site throughout the
                        day every day, read every post and delete what I have
                        to. Sometimes I’m away from my computer for a while
                        because it’s nice out, or I’m on a vacation, or it’s a
                        powder day, or I left my computer at work overnight, or
                        I’m sleeping. Don’t fret - when we see something
                        inappropriate we’ll delete it. However, wouldn’t it be
                        nice if we didn’t have to delete anything? Play nice. If
                        you’ve gotten a scolding email from me, you deserved it
                        – don’t do it again. If you think I’ve missed something
                        that should be deleted, email me.
                    </li>
                </ul>
            </p>
            <p>
                We firmly believe in free speech and respect people’s right to
                have an opinion. Freedom of speech includes the ability to voice
                critical opinions. Deciding whose opinions are and aren’t valid
                is a slippery slope, and we do not delete posts just because we
                don’t agree with them. People are entitled to their opinion so
                long as they’re not inciting crime, making threats, sharing
                obscenity or profanity, or being libellous by publishing a false
                claim about a person. However, freedom of speech does not
                include the right to incite hatred. Play nice!{' '}
            </p>
            <p>
                Since we started the Stoke List almost four years ago, there
                have been well over 100,000 posts. The Stoke List serves as a
                forum for this community, and it’s often hilarious and sometimes
                really productive. Please use it for good rather than bad. If
                you have a complaint about a business, let the business owner
                know in person. If you hate that lots of new people move here
                for the outdoor activities, get used to it. If you’re new to
                town, make sure you get all the facts first. Check out the{' '}
                <Link to="/garage">Garage Sale Map</Link>. If you sit at your
                computer every day thinking of things to complain about,
                re-evaluate your life and do some good instead. Did you have a
                great experience somewhere? Post about it. See something that
                made you smile? Great! Share it with us!{' '}
            </p>
            <p>
                Think twice before you post in anger, frustration or just to be
                cruel. Move on and make the best of life - carrying around
                grudges and resentment won’t make your feel better, but maybe
                volunteering as an ESL tutor, playing music, making art, getting
                some exercise, meeting new friends at a coffee shop, or starting
                a new business will. Lead by example, friends.{' '}
            </p>
            <p>
                Whoever you are, enjoy Revelstoke - this place is magical. Smile
                at everyone you pass on the street. We all choose to live here
                (either born or transplanted), so we’ve all got that in common.
                Remember the “campsite rule” - leave Revelstoke in better shape
                than when you found it. That means something different to
                everyone and can be really simple: patronize local businesses or
                galleries; volunteer with an organization; join a committee;
                join the community band; shovel your neighbour’s driveway or mow
                their lawn; look both ways before you cross the street (whether
                you’re walking, on a bike, or in a car!); pat dogs (whether
                they’re downtown or not!); donate to the food bank; be nice to
                the people helping you; hold the door open for people; pick up
                litter (and your dog’s doo-doo); smooth out differences in a
                peaceful manner rather than resorting to violence or angry
                words; and don’t get into needlessly petty arguments on the
                Stoke List. This goes for all of you! Questions, concerns,
                comments, happy thoughts? Lemme know.
            </p>
            <p>
                Here’s a final note. Ghandi said, “Be the change you want to see
                in the world.”
            </p>
            <p>Keep smiling, and keep on keeping on. Teamwork! </p> <p>Love,</p>
            <p>Karilyn Kempton from the Stoke</p>
        </Fragment>
    )
}

export default Commandments
