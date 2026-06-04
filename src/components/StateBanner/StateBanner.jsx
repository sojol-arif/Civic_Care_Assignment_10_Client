// src/components/StatsBanner/StatsBanner.jsx
import { useEffect, useState } from "react";
import { SlideUp } from "../../hooks/reveal_awesome_animation_custom/ReactAnimation";

export default function StatsBanner() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
  });

  useEffect(() => {
    // Fetch real data from your API
    Promise.all([
        fetch('https://civic-care-server-five.vercel.app/users').then(res => res.json()),
        fetch('https://civic-care-server-five.vercel.app/issues').then(res => res.json()),
    ]).then(([users, issues]) => {
        setStats({
            totalUsers: users.length,
            resolvedIssues: issues.filter(issue => issue.status === 'ended').length,
            pendingIssues: issues.filter(issue => issue.status === 'ongoing').length,
        });
    })
  }, []);

  const data = [
    { number: stats.totalUsers, label:"Total Users" },
    { number: stats.resolvedIssues, label:"Resolved Issues" },
    { number: stats.pendingIssues, label:"Pending Issues" },
  ]

  return (
    <section className="bg-primary [--color-primary:#0f5238]">
      <div className="main-container">
        <SlideUp cascade damping={0.2}>
          <div className="grid grid-cols-3 gap-8 py-12">
            {data.map((stat, index) => 
              <div key={index} className="flex flex-col items-center gap-0 text-center">
                <span className='text-secondary [--color-secondary:#b1f0ce] text-[48px] font-bold leading-none'> {stat.number}</span>
                <p className="text-[16px] uppercase color-[#fff] text-white font-semibold">{stat.label}</p>
              </div>
            )}
          </div>
        </SlideUp>
      </div>
    </section>
  );
}