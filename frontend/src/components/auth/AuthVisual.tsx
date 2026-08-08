


import  appConfig  from "@/config/appConfig";

export default function AuthVisual(): React.JSX.Element {
  return (
    <>
      <div className="gossip-auth-visual-overlay">
        <img src={appConfig.authBg} alt="Gossip" />
      </div>

      <div className="gossip-auth-visual-content">
        <span className="gossip-auth-eyebrow">
          CONNECT • SHARE • HAVE FUN
        </span>

        <h1>
          Your people.
          <br />
          Your stories.
          <br />
          Your Gossip.
        </h1>

        <p>
          Share moments, discover new people
          and stay connected with the conversations
          that matter to you.
        </p>

        <div className="gossip-auth-visual-users">
          <div className="gossip-auth-avatars">
            <img src="/images/auth/user-1.jpg" alt="" />
            <img src="/images/auth/user-2.jpg" alt="" />
            <img src="/images/auth/user-3.jpg" alt="" />
            <img src="/images/auth/user-4.jpg" alt="" />
          </div>

          <span>
            Join people already on Gossip
          </span>
        </div>
      </div>

      <div className="gossip-auth-visual-footer">
        © {new Date().getFullYear()} Gossip
      </div>
    </>
  );
}

