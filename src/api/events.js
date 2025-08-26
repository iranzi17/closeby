import { insertHangoutEvent, insertParticipation } from './dataconnectClient';

/**
 * Create a new hangout event.
 * @param {object} event - Fields for HangoutEventInsertInput.
 * @param {string} authToken - Firebase ID token. Data Connect uses this to populate auth context (e.g., auth.uid).
 */
export function createEvent(event, authToken) {
  return insertHangoutEvent(event, authToken);
}

/**
 * Join an existing hangout event.
 * @param {string} hangoutEventId - UUID of the event to join.
 * @param {string} authToken - Firebase ID token used for Data Connect authorization.
 */
export function joinEvent(hangoutEventId, authToken) {
  const participation = {
    hangoutEventId,
    userId_expr: 'auth.uid',
    status: 'pending',
  };
  return insertParticipation(participation, authToken);
}
