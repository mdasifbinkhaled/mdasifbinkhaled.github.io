import type { CourseData } from '@/shared/types';
import { Ic } from './course-icons';
import { copyToClipboard } from './copy-link';

/** Sticky rail: instructor panel (copyable email + consultation) + quick access. */
export function Rail({ course }: { course: CourseData }) {
  const staff = course.staff;
  const consult = course.consultation;
  const quickLinks = course.quickLinks ?? [];

  return (
    <aside className="aside">
      {staff ? (
        <div className="panel">
          <div className="panel__h">
            <Ic name="circle-user-round" /> Instructor
          </div>
          <div className="staff">
            <span className="staff__avatar" aria-hidden="true">
              {staff.initials}
            </span>
            <span className="staff__meta">
              <span className="staff__name">{staff.name}</span>
              <span className="staff__role">{staff.role}</span>
            </span>
          </div>
          {staff.email ? (
            <button
              type="button"
              className="staff__mail"
              onClick={() => copyToClipboard(staff.email ?? '')}
              title="Copy email"
            >
              <Ic name="mail" />{' '}
              <span className="staff__mailtext">{staff.email}</span>{' '}
              <Ic name="copy" className="staff__copyic" />
            </button>
          ) : null}
          {consult ? (
            <div className="staff__consult">
              {consult.office ? (
                <div className="consult__row">
                  <span className="consult__k">Office</span>
                  <span className="consult__v">{consult.office}</span>
                </div>
              ) : null}
              <div className="consult__row">
                <span className="consult__k">Hours</span>
                <span className="consult__v">{consult.hours}</span>
              </div>
              {consult.phone ? (
                <div className="consult__row">
                  <span className="consult__k">Phone</span>
                  <span className="consult__v">{consult.phone}</span>
                </div>
              ) : null}
              {consult.note ? (
                <p className="consult__note">{consult.note}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {quickLinks.length ? (
        <div className="panel">
          <div className="panel__h">
            <Ic name="zap" /> Quick access
          </div>
          <div className="qlinks">
            {quickLinks.map((l) => (
              <span
                key={l.label}
                className={`qlink${l.primary ? ' qlink--primary' : ''}`}
              >
                <a
                  className="qlink__main"
                  href={l.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Ic name={l.icon} /> {l.label}
                </a>
                {l.url ? (
                  <button
                    type="button"
                    className="qlink__copy"
                    title={`Copy link to ${l.label}`}
                    aria-label={`Copy link to ${l.label}`}
                    onClick={() => copyToClipboard(l.url ?? '')}
                  >
                    <Ic name="copy" />
                  </button>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
